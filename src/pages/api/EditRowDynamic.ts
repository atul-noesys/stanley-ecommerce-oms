import type { NextRequest } from "next/server";
import pkg from "../../../package.json";
import axios from "axios";

export const runtime = "edge";

export default async function handler(request: NextRequest) {
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      const authHeader = request.headers.get("Authorization");
      const rowId = body.ROWID;
      const formId = body.formId;
      const tableName = body.tableName;

      if (!rowId) {
        return new Response(
          JSON.stringify({
            message: "ROWID is required",
          }),
          {
            headers: { "content-type": "application/json" },
            status: 400,
          }
        );
      }

      if (!formId) {
        return new Response(
          JSON.stringify({
            message: "formId is required",
          }),
          {
            headers: { "content-type": "application/json" },
            status: 400,
          }
        );
      }

      if (!tableName) {
        return new Response(
          JSON.stringify({
            message: "tableName is required",
          }),
          {
            headers: { "content-type": "application/json" },
            status: 400,
          }
        );
      }

      if (!authHeader) {
        return new Response(
          JSON.stringify({
            message: "Authorization header is required",
          }),
          {
            headers: { "content-type": "application/json" },
            status: 401,
          }
        );
      }

      // Remove ROWID, InfoveaveBatchId, formId, and tableName from body before sending to API
      const {
        ROWID,
        InfoveaveBatchId,
        formId: _,
        tableName: __,
        ...rowData
      } = body;

      console.log("EditRow API - Sending to upstream:", {
        primaryKeyData: {
          primaryKey: "ROWID",
          value: String(rowId),
        },
        rowDataKeys: Object.keys(rowData),
      });

      const requestPayload = {
        primaryKeyData: {
          primaryKey: "ROWID",
          value: String(rowId),
        },
        rowData: rowData,
        tableName: tableName,
      };

      const response = await axios.put(
        `https://nooms.infoveave.app/api/v10/ngauge/forms/${formId}/row`,
        requestPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
            "x-web-app": "Infoveave",
            "x-web-app-version": pkg.version,
          },
        }
      );

      console.log("Upstream API response:", response.status, response.data);

      return new Response(
        JSON.stringify({
          message: "Row Updated Successfully",
          data: response.data.data,
        }),
        {
          headers: { "content-type": "application/json" },
          status: 200,
        }
      );
    } catch (error) {
      console.error("Proxy error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const statusCode = axios.isAxiosError(error)
        ? error.response?.status || 500
        : 500;
      const errorData = axios.isAxiosError(error) ? error.response?.data : null;

      console.error("Error details:", { statusCode, errorData, errorMessage });

      return new Response(
        JSON.stringify({
          message: "Failed to update row",
          error: errorMessage,
          details: errorData,
        }),
        {
          headers: { "content-type": "application/json" },
          status: 500,
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        message: "Method not allowed",
        details: "Please use PUT method",
      }),
      {
        headers: { "content-type": "application/json" },
        status: 405,
      }
    );
  }
}
