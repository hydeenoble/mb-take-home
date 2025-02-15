import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { eq } from 'drizzle-orm';
import { db } from '../db/dbClient';
import { tasks } from "../../../core/src/migrations/tasks";

import { handler } from '../handlers/getTasks';


// Mock the database

jest.mock('../db/dbClient');


describe('Task functions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getTasks', () => {
      it('should return all tasks', async () => {
        const mockTasks = [
          { id: 1, description: "This the first tasks", created_at:"2025-02-14T23:06:23.501Z"},
          { id: 2, description: "This the second tasks", created_at:"2025-02-13T23:06:23.501Z"},
        ];

        (db.select as jest.Mock).mockImplementation(() => {
          return {
            from: jest.fn().mockImplementation(() => ({
              execute: jest.fn().mockResolvedValue(mockTasks as never)
            }))
          };
        });


  
        const result =  await handler({} as any, {} as any, {} as any);
  
        expect(JSON.parse(result.body)).toEqual(mockTasks);
      });

      it('should return an Error', async () => {

        (db.select as jest.Mock).mockImplementation(() => {
          return {
            from: jest.fn().mockImplementation(() => ({
              execute: jest.fn().mockRejectedValue(new Error("Problem with DB") as never)
            }))
          };
        });


  
        const result =  await handler({} as any, {} as any, {} as any);
  
        expect(JSON.parse(result.body)).toEqual({"error": "Failed to fetch tasks"});
      });


    });
});