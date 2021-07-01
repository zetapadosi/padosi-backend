
export const testPost = (req,res,next) =>{
try {
 const testPostData = 'The test Post is working '
 return res.ok({message:"SUCCESS", value:testPostData})
 } catch (e) {
  console.error(e.message);
  next(e)
 }
}