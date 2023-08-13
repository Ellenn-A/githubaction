import { getInput } from "@actions/core"
import {context} from "@actions/github"

type GithubContext = typeof context

const inputName = getInput('name')

greet(inputName, getRepoURL(context))

console.log('Action info -----------')
console.log('eventname: ', context.eventName)
console.log('sha: ', context.sha)
console.log('ref: ', context.ref)
console.log('workflow: ', context.workflow)
console.log('job: ', context.job)

console.log(JSON.stringify(context.payload, undefined,2))

function greet(name:string, repoUrl: string){
    console.log(`Hello ${name}! You are running Github Action in ${repoUrl}`)
}

function getRepoURL({repo, serverUrl}:GithubContext):string{
    return `${serverUrl}/${repo.owner}/${repo.repo}`
}