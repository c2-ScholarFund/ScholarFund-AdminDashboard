const { Event } = require("../model/Stuproblem");

const activateEventController = async (req, res) => {
  const event = new Event();
  console.log("made it into controller");
  try {
    const response = await Event.findOneAndUpdate(
      {
        email: req.params.email,
      },
      {
        active: true,
      }
    );
    console.log("done finding");
    res.json(response);
  } catch (error) {
    console.log("get events error");
    console.log(error);
  }
};

module.exports.activateEventController = activateEventController;
