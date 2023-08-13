import { getInput } from "@actions/core"
import {context, getOctokit} from "@actions/github"

type GithubContext = typeof context

const inputName = getInput('name')
const ghToken = getInput('githubToken')

greet(inputName, getRepoURL(context))

getDiff().then(files => {
    console.log(`
    Your PR diff: \n
    ${JSON.stringify(files,undefined,2)}`)
})

function greet(name:string, repoUrl: string){
    console.log(`Hello ${name}! You are running Github Action in ${repoUrl}`)
}

function getRepoURL({repo, serverUrl}:GithubContext):string{
    return `${serverUrl}/${repo.owner}/${repo.repo}`
}

async function getDiff(){
    if(ghToken && context.payload.pull_request){
        const octokit = getOctokit(ghToken)

        const result = await octokit.rest.repos.compareCommits({
            repo: context.repo.repo,
            owner:context.repo.owner,
            head: context.payload.pull_request.head.sha,
            base: context.payload.pull_request.base.sha,
            page: 100
        })
        return result.data.files || []
        
    }
}