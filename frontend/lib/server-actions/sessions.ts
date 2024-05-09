'use server';

import { createSession as BaseCreateSession } from "@/lib/sessions";

export const createSession  = (data: any) => {
    BaseCreateSession({user: data.user})
}