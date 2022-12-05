import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10)

const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, salt)

const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => await bcrypt.compare(password, hashPassword);

// bcrypt.encodeBase64

export { hashPassword, comparePassword }