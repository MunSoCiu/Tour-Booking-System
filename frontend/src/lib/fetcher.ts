import { getAuthHeader } from "./auth";

/**
 * Fetcher function for SWR
 * Automatically includes auth token in headers
 */
export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

/**
 * POST fetcher for SWR mutations
 */
export const postFetcher = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while posting the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

/**
 * PUT fetcher for SWR mutations
 */
export const putFetcher = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while updating the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

/**
 * DELETE fetcher for SWR mutations
 */
export const deleteFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while deleting the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};
