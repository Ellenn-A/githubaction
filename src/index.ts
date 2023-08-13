import { getInput } from "@actions/core"
import {context} from "@actions/github"

type GithubContext = typeof context

const inputName = getInput('name')

greet(inputName, getRepoURL(context))

function greet(name:string, repoUrl: string){
    console.log(`Hello ${name}! You are running Github Action in ${repoUrl}`)
}

function getRepoURL({repo, serverUrl}:GithubContext):string{
    return `${serverUrl}/${repo.owner}/${repo.repo}`
}