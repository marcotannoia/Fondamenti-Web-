const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    difficulty: { type: Number, min: 1, max: 5, required: true },
    studyingTime_weeks: { type: Number, required: true },
    correctionTime_weeks: { type: Number, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });


// struttura esame data dal admin
const examsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    professor: { type: String, required: true },
    reviews: [userReviewSchema] ,
    degreeCourse: { type: String, required: true }
});

module.exports = mongoose.model('Exams', examsSchema);