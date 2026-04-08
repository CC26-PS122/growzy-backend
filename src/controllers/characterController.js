export const getCharacter = async (req, res) => {
  if (!req.character) {
    return res.status(404).json({
      success: false,
      message: "Character not found. User might not have completed the survey yet.",
      data: null
    });
  }

  return res.status(200).json({
    success: true,
    message: "Character fetched successfully!",
    data: req.character
  });
};
