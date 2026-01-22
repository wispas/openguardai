"use client";

import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp } from "firebase/app";

export async function initAnalytics() {
  if (typeof window === "undefined") return null;

  const supported = await isSupported();
  if (!supported) return null;

  return getAnalytics(getApp());
}
