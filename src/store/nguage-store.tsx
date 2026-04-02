import { axios, AxiosResponse, authConfig } from "./axios";
import { makeAutoObservable } from "mobx";

interface InfoboardFromAPI {
  id: number;
  name: string;
}

export type PaginationData = {
  DeletedColumns: string[];
  filterData: (string | number | null)[][];
  TotalRowCount: number;
  data: Record<string, string | number | Date | null>[];
  tableName: string;
};

export type PrimaryKeyData = {
  primaryKey: string;
  value: string;
};

export type RowData = Record<string, string | number | null>;

export type CurrentUser = {
  firstName: string;
  email: string;
  lastName: string;
  userName: string;
  roleId: number;
};

export class NguageStore {
  count = 0;
  approvalData: Document[] = [];
  searchText: string = "";
  currentUser: CurrentUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async GetPaginationData(tableData: {
    table: string;
    skip: number;
    take: number | null;
    NGaugeId: string | undefined;
    filters?:
    | { [key: string]: { items: string[]; operator: string }[] }
    | undefined;
    sort?: { [keyValue: string]: string } | undefined;
  }): Promise<PaginationData | null> {
    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      const response = await axios.post(
        "/api/GetData",
        tableData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      return response.data.data;
    } catch {
      return null;
    }
  }

  async UpdateRowDataDynamic(
    rowData: RowData,
    rowId: string,
    formId: number,
    tableName: string,
  ): Promise<{ result: boolean; error: string }> {
    try {
      // Get token from localStorage (client-side only)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      // Combine ROWID, formId, tableName with row data
      const requestBody = {
        ROWID: rowId,
        formId: formId,
        tableName: tableName,
        ...rowData,
      };

      await axios.put("/api/EditRowDynamic", requestBody, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return { result: true, error: "" };
    } catch (e) {
      return { result: false, error: "error" };
    }
  }

  async AddRowData(
    rowData: RowData,
    tableNumber: number,
    tableName: string,
  ): Promise<{ result: string | null; error: string }> {
    try {
      // Get token from localStorage (client-side only)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      const { data }: AxiosResponse<string> = await axios.post(
        "/api/AddRow",
        {
          tableNumber,
          tableName,
          ...rowData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      return { result: data, error: "" };
    } catch (e) {
      return {
        result: null,
        error: (e as { data: { ref: string } }).data.ref ?? "",
      };
    }
  }

  async DeleteRowDataDynamic(
    tableName: string,
    rowId: string,
    formId: number,
  ): Promise<{ result: boolean; error: string }> {
    try {
      // Get token from localStorage (client-side only)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      const requestBody = {
        ROWID: rowId,
        formId: formId,
        tableName: tableName,
      };

      await axios.put("/api/DeleteRowDataDynamic", requestBody, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return { result: true, error: "" };
    } catch (e) {
      return { result: false, error: "error" };
    }
  }

  async GetRowData(
    formId: number,
    rowId: string | number,
    tableName: string,
  ): Promise<RowData | null> {
    try {
      const response = await axios.post(
        "/api/GetRowDataDynamic",
        {
          formId: formId,
          ROWID: rowId,
          tableName,
        },
        authConfig({}),
      );

      return { ...response.data.data, "ROWID": rowId };
    } catch (error) {
      console.error("Error fetching row data:", error);
      return null;
    }
  }

  async GetCurrentUser(): Promise<CurrentUser | null> {
    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      const response = await axios.get(
        "/api/GetCurrentUser",
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      const userData: CurrentUser = {
        firstName: response.data.data.firstName,
        email: response.data.data.email,
        lastName: response.data.data.lastName,
        userName: response.data.data.userName,
        roleId: response.data.data.roleId,
      };

      this.currentUser = userData;

      // Store user data in localStorage for persistence across page refreshes
      if (typeof window !== "undefined") {
        localStorage.setItem("current_user", JSON.stringify(userData));
      }

      return userData;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  GetCurrentUserDetails(): CurrentUser | null {
    // Return in-memory cache first
    if (this.currentUser) {
      return this.currentUser;
    }

    // If no in-memory cache, try to restore from localStorage
    if (typeof window !== "undefined") {
      const cachedUser = localStorage.getItem("current_user");
      if (cachedUser) {
        try {
          this.currentUser = JSON.parse(cachedUser);
          return this.currentUser;
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          return null;
        }
      }
    }

    return null;
  }

  ClearCurrentUser(): void {
    this.currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("current_user");
    }
  }

  async GetInfoboards(): Promise<InfoboardFromAPI[] | null> {
    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }
      const result: AxiosResponse<InfoboardFromAPI[]> = await axios.get(
        `https://nooms.infoveave.app/api/v10/Infoboards`,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching infoboards:", error);
      return null;
    }
  }

  async BulkDeleteBasedOnTable(
    id: string | number,
    table: string,
  ): Promise<{ result: boolean; error: string }> {
    try {
      await axios.put(
         "/api/DeleteAllBatchesBasedOnTableName",
        { tableName: table, id: id },
        authConfig({}),
      );

      return { result: true, error: "" };
    } catch (e) {
      return { result: false, error: "error" };
    }
  }
}
