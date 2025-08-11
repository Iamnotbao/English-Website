

export type User= {
    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    avatar: string;
    role: string;
    lessons:string;
    level: string;
    overall: number;
    bio: string;
    certifications?:string[];
    badges?:string[];
    gallery:string[];
    skills?: { name: string; progress: number }[];
}
 