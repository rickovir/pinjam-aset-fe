import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest runs without `globals: true`, so RTL's auto-cleanup never hooks in.
afterEach(() => cleanup());
