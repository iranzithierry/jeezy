// "use client";
import React from 'react'
import ClientPage from './components/client-page'
import { all, search } from '@/apis/repository'

export default async function Page() {
    const fetchedRepositories = await all()
    return (<ClientPage search={search} repos={fetchedRepositories}/>)
}
