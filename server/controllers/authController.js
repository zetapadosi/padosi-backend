export const testAuth = async (req, res, next) => {
 try {
  const testData = {
   testDetails: 'The test is working fine ',
  };
  return res.ok({message:'SUCCESS',value:testData})
 } catch (e) {
  console.error(e.message);
  next(e);
 }
};

export const loginAuth = async (req,res,next) => {
 try {
  // const {name,email,location,picture,} = req.body
  // const userData = {
  //  name,
  //  email,
  //  location,
  //  picture
  // }
  return res.ok({message:'SUCCESS', value: req.body})
 } catch (e) {
  console.error(e.message);
  next(e)
 }
}
