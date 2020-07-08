import { generateAge } from '../../utils/generateAge';

describe('Generate Age', () => {
  it('should generate 30 years old', () => {
    const age = generateAge('1989-12-13');
    expect(age).toBe(30);
  })
  it('should generate 57 years old', () => {
    const age = generateAge('1963-02-19');
    expect(age).toBe(57);
  })
})