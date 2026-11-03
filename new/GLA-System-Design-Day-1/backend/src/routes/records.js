const express = require("express");
const Record = require("../models/Record");
const router = express.Router();

// Baseline: intentionally returns every record for the first experiment.
router.get("/all", async (req, res) => {
  try {
    const records = await Record.find({}).sort({ _id: 1 }).lean();
    res.json({ records });
  } catch (error) {
    console.error("GET /api/records/all failed:", error);
    res.status(500).json({ message: "Failed to load all records" });
  }
});



router.get("/", async (req, res) => {
  try {
    const parsedPage = Number.parseInt(req.query.page, 10);  
    const parsedLimit = Number.parseInt(req.query.limit, 10);
    console.log("Parsed page:", parsedPage, "Parsed limit:", parsedLimit);

    const requestedpage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    const requestedlimit = Number.isNaN(parsedLimit) || parsedLimit < 1 ? 10 : parsedLimit;

    const limit = Math.min(requestedlimit, 100); 

    const skip = (requestedpage - 1) * limit;

    const [records , total] = await Promise.all([
       Record.find({}).sort({_id: 1}).skip(skip).limit(limit).lean(),
       Record.countDocuments({})

      
    ])

   const totalPages = Math.ceil(total/limit);

   res.status(200).json({
    success: true,
    records,
    pagination: {
      page: requestedpage,
      limit,
      total,
      totalPages,
      hasPreviousPage: requestedpage > 1,
      hasNextPage: requestedpage < totalPages,
      prevPage: requestedpage > 1 ? requestedpage - 1 : null,
      nextPage: requestedpage < totalPages ? requestedpage + 1 : null,
    },
   })


  } catch (error) {
    console.error("GET /api/records failed:", error);
    res.status(500).json({ message: "Failed to load records" });
  }
});

module.exports = router;
