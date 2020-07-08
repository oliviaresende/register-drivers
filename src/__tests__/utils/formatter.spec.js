import { cpfMask, telMask, dateFormatter } from '../../utils/formatter';


describe('Formatter', () => {
  it('should return 990.730.310-01', () => {
    const cpf = cpfMask('99073031001');
    expect(cpf).toBe('990.730.310-01');
  })
  it('should return (11)99999-9999', () => {
    const tel = telMask('11999999999');
    expect(tel).toBe('(11)99999-9999');
  })
  it('should return 08/07/2020', () => {
    const tel = dateFormatter('2020-07-08')
    expect(tel).toBe('08/07/2020');
  })
})