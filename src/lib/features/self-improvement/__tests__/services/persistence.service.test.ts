import { describe, it, expect, vi, beforeEach } from 'vitest';
import { persistenceService } from '../../services/persistence.service';
import { storage } from '../../utils/storage';
import { loggerService } from '$lib/features/core/services';

vi.mock('../../utils/storage');
vi.mock('$lib/features/core/services');

describe('PersistenceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('State Management', () => {
    it('should save state', async () => {
      const mockState = {
        metrics: {},
        config: {},
        timestamp: new Date().toISOString()
      };

      await persistenceService.saveState(mockState);

      expect(storage.save).toHaveBeenCalledWith(
        'state_history',
        expect.arrayContaining([mockState])
      );
    });

    it('should limit state history to 100 entries', async () => {
      const mockStates = Array(101).fill({
        metrics: {},
        config: {},
        timestamp: new Date().toISOString()
      });

      vi.mocked(storage.load).mockResolvedValue(mockStates);
      
      const newState = {
        metrics: {},
        config: {},
        timestamp: new Date().toISOString()
      };

      await persistenceService.saveState(newState);

      expect(storage.save).toHaveBeenCalledWith(
        'state_history',
        expect.arrayContaining([newState])
      );
      expect(vi.mocked(storage.save).mock.calls[0][1]).toHaveLength(100);
    });
  });

  describe('Note Management', () => {
    it('should save note', async () => {
      const mockNote = {
        id: 'test-id',
        timestamp: new Date().toISOString(),
        type: 'improvement',
        description: 'Test note',
        changes: []
      };

      await persistenceService.saveNote(mockNote);

      expect(storage.save).toHaveBeenCalledWith(
        'notes',
        expect.arrayContaining([mockNote])
      );
    });

    it('should handle errors when saving note', async () => {
      const error = new Error('Test error');
      vi.mocked(storage.save).mockRejectedValue(error);

      const mockNote = {
        id: 'test-id',
        timestamp: new Date().toISOString(),
        type: 'improvement',
        description: 'Test note',
        changes: []
      };

      await expect(persistenceService.saveNote(mockNote)).rejects.toThrow(error);
      expect(loggerService.error).toHaveBeenCalledWith('Failed to save note', error);
    });
  });
});