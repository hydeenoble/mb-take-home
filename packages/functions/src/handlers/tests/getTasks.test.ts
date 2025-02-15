import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { eq } from 'drizzle-orm';
import { db } from '../../db/dbClient';
import { tasks } from "../../../../core/src/migrations/tasks";

import { handler } from '../getTasks';
import { Task } from '../../types/task'


// Mock the database

// jest.mock('../../db/dbClient');

// Mock the drizzle function
jest.mock('drizzle-orm/node-postgres', () => ({
  drizzle: jest.fn(),
}));


describe('Task functions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getTasks', () => {

      it('should return all tasks', async () => {
        const mockTasks: Task[] = [
              { id: 1, description: "This the first tasks", created_at:"2025-02-14T23:06:23.501Z"},
              { id: 2, description: "This the second tasks", created_at:"2025-02-13T23:06:23.501Z"},
            ];
        const mockSelect = jest.fn().mockResolvedValue(mockTasks);
        const mockFrom = jest.fn().mockReturnValue({ where: mockSelect });
        const mockDb = { select: jest.fn().mockReturnValue({ from: mockFrom }) };
        
        (drizzle as jest.Mock).mockReturnValue(mockDb);
    
        const result = await handler({} as any, {} as any, {} as any);
    
        expect(result).toEqual(mockTasks);
        // expect(drizzle).toHaveBeenCalledWith(process.env.DATABASE_URL);
        expect(mockDb.select).toHaveBeenCalled();
        expect(mockFrom).toHaveBeenCalledWith(tasks);
        // expect(mockSelect).toHaveBeenCalledWith(eq(todos.id, 1));
      });


      // it('should return all tasks', async () => {
      //   const mockTasks = [
      //     { id: 1, description: "This the first tasks", created_at:"2025-02-14T23:06:23.501Z"},
      //     { id: 2, description: "This the second tasks", created_at:"2025-02-13T23:06:23.501Z"},
      //   ];

      //   // const mockSelect = (db.select as jest.Mock).mockReturnValue(mockTasks);
      //   // const mockFrom = (mockTasks.from() as jest.Mock).mockReturnValue();



      //   (mockedDB.select as jest.Mock).mockImplementation([]);
  

  
      //   const result =  await handler({} as any, {} as any, {} as any);
  
      //   expect(result).toEqual(mockTasks);
      //   // expect(db.select).toHaveBeenCalledWith().from(tasks);
      // });
  
    //   it('should return tasks for a specific user', async () => {
    //     const userId = 1;
    //     const mockTasks = [
    //       { id: 1, title: 'Task 1', completed: false, userId: 1 },
    //     ];
  
    //     (db.select as jest.Mock).mockResolvedValue(mockTasks);
  
    //     const result = await getTasks(userId);
  
    //     expect(result).toEqual(mockTasks);
    //     expect(db.select).toHaveBeenCalledWith().from(tasks).where(eq(tasks.userId, userId));
    //   });
    });
});