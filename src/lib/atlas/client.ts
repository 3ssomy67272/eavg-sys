const ATLAS_BASE_URL = process.env.NEXT_PUBLIC_ATLAS_PORTAL_URL;

async function atlasFetch<T>(path: string): Promise<T> {
  const token = process.env.NEXT_PUBLIC_CC_DoorsKey;
  if (!token) {
    throw new Error("CC is not set in environment variables.");
  }

  const response = await fetch(`${ATLAS_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Atlas API error: ${response.status}`);
  }

  return response.json();
}

export async function getMembers() {
  const res = await atlasFetch<{
    errorCode: number;
    errorMessage: string;
    customMessage: string;
    data: any[];
  }>("members/all");

  return res.data;
}

export async function getPilotRanks() {
  const res = await atlasFetch<{
    errorCode: number;
    errorMessage: string;
    customMessage: string;
    data: any[];
  }>("ranks/pilots");

  return res.data;
}
