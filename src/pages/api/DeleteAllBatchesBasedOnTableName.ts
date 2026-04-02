import type { NextApiRequest, NextApiResponse } from "next";
import pkg from "../../../package.json";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const body = req.body;
      const authHeader = req.headers.authorization;
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

      return res.status(200).json({
        message: "Batch Deleted Successfully",
        data: response.data.data,
      });
    } catch (error) {
      console.error("Proxy error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const statusCode = axios.isAxiosError(error)
        ? error.response?.status || 500
        : 500;
      const errorData = axios.isAxiosError(error) ? error.response?.data : null;

      console.error("Error details:", { statusCode, errorData, errorMessage });

      return res.status(statusCode).json({
        message: "Failed to Delete Batch",
        error: errorMessage,
        details: errorData,
      });
    }
  } else {
    return res.status(405).json({
      message: "Method not allowed",
      details: "Please use PUT method",
    });
  }
}
