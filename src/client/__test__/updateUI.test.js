  
import { updateUI } from '../js/updateUI';

describe('Function existence check', () => {
  test('Return true', () => {
    expect(updateUI).toBeDefined();
  });
});