import type { NextRequest } from "next/server";
import pkg from "../../../package.json";
import axios from "axios";

export const runtime = "edge";

export default async function handler(request: NextRequest) {
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      const authHeader = request.headers.get("Authorization");
      const id = body.id;
      const tableName = body.tableName;

      const requestPayload = {
        tableName: tableName,
      };

      const response = await axios.patch(
        `https://nooms.infoveave.app/api/v10/insights/datasources/${id}/batches/bulk-delete-based-on-table`,
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
          message: "Batch Deleted Successfully",
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
          message: "Failed to Delete Batch",
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
