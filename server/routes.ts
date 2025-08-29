import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // This is a frontend-only application using external APIs
  // No backend API routes are needed as we're using Fake Store API
  
  const httpServer = createServer(app);
  return httpServer;
}
