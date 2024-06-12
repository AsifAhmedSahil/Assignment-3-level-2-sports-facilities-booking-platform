import bcryptjs from "bcryptjs"


export const isPasswordMatched = async(plainPassword:string,hashedPassword:string) : Promise<boolean> =>{
    const matchedPassword = await bcryptjs.compare(plainPassword,hashedPassword)
    return matchedPassword
}