export class JobBlock {
    contractor:string;
    jobId:string;
    jobCount:string;
   
    constructor(contra:string,jobId:string,jobCount:string){
        this.contractor=contra;
        this.jobId=jobId;
        this.jobCount=jobCount;
    }
}
