export const testAuth = async (req, res, next) => {
 try {
  const testData = {
   testDetails: 'The test is working fine ',
  };
  return res.ok({message:'SUCCESS',value:testData})
  // return res.status(200).json({ message: 'Success', value: testData });
 } catch (e) {
  console.error(e.message);
  next(e);
 }
};
