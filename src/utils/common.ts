import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export async function encrypt(password: string) {
    return await bcrypt.hash(password, saltRounds);
}

export async function compares(password:string,dbpassword:string) {
    return await bcrypt.compare(password,dbpassword)
}