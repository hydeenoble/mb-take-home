import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { db } from '../db/dbClient';
import { handler } from '../handlers/createTask';
import { APIGatewayProxyEvent } from 'aws-lambda';


// Mock the database

jest.mock('../db/dbClient');


describe('Task functions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createTask', () => {
      it('should create a task', async () => {
        const mockTask = { id: 1, description: "This the first tasks", created_at:"2025-02-14T23:06:23.501Z"};


        (db.insert as jest.Mock).mockImplementation(() => {
          return {
            values: jest.fn().mockImplementation(() => ({
                returning: jest.fn().mockImplementation(() => ({
                    execute: jest.fn().mockResolvedValue(mockTask as never)
                }))
            }))
          };
        });

        const inputTask = {
            description: 'This is a test task',
          };
      
          const mockEvent = {
            body: JSON.stringify(inputTask),
          } as APIGatewayProxyEvent;

        const result =  await handler(mockEvent, {} as any, {} as any);
  
        expect(JSON.parse(result.body)).toEqual(mockTask);
      });

      it('should return an Error', async () => {

        (db.select as jest.Mock).mockImplementation(() => {
          return {
            from: jest.fn().mockImplementation(() => ({
              execute: jest.fn().mockRejectedValue(new Error("Problem with DB") as never)
            }))
          };
        });

        const inputTask = {
            description: 'This is a test task',
        };
    
        const mockEvent = {
            body: JSON.stringify(inputTask),
        } as APIGatewayProxyEvent;


  
        const result =  await handler({} as any, {} as any, {} as any);
  
        expect(JSON.parse(result.body)).toEqual({ error: 'Failed to create task' });
      });
    });
});