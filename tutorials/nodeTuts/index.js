// creating a file with input
// console.log(process)//this gives list of all files/processes
// console.log(process.argv)//this gives two results which are fixed one from where we are running noe and where it is installed
const fs=require('fs');//to import file system module
const path=require('path') // to import path module
const input=process.argv;
// file addition and removal 
if(input[2]=='add'){
fs.writeFileSync(input[3],input[4]);//this creates a file with input
}
else if(input[2]=='remove'){
    fs.unlinkSync(input[3])
}
// else {
//     console.log('invalid input')
// }
// node index.js remove file2.txt 'this is file2' for removal 'this is ....' string is not needed
// to add just keep add in place of remove to add a file we need content we need the string
// tocreate files from node command line
fs.writeFileSync('file1.txt','this is file one created'); 
// to create files in loop
// for(i=1;i<=10;i++)fs.writeFileSync(`file_${i}.txt`); 
// // to delete files in a loop
// for(i=1;i<=10;i++)fs.unlinkSync(`file_${i}.txt`);
const folderPath=path.join(__dirname,'files');
// // console.log(folderPath)
// for(i=1;i<=10;i++){
// fs.writeFileSync(`fileName_${i}.txt`,`this is file${i}`);
// }
// for(i=1;i<=10;i++)fs.unlinkSync(`fileName_${i}.txt`);
fs.readdir(folderPath,(err,files)=>{
    // to get files list
    // console.log(files)
    files.forEach((item)=>{
        console.log('file name is',item)
    })
})