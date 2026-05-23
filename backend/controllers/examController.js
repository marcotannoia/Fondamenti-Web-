// gli permetto di ricercalo 
const Exam = require('../models/Exams');

exports.getExamByName = async (req, res) => {
  try {
    const { name } = req.params; // il fatto che name sia tra graffe significa che mi sto riferendo ad una singola proprieta non a tutto l'oggetto
    const exam = await Exam.findOne({ name });
    if (!exam) return res.status(404).json({ error: "Esame non trovato" });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// e di lasciare una review all'esame
exports.addReview = async (req, res) => {
    try {
        const { examId } = req.params; // ID dell'esame passato nell'URL
        const { difficulty, studyingTime_weeks, correctionTime_weeks, comment } = req.body;
        
        const userId = req.user.id; 

        const updatedExam = await Exam.findByIdAndUpdate(
            examId,
            {
                $push: {
                    reviews: {
                        userId,
                        difficulty,
                        studyingTime_weeks,
                        correctionTime_weeks,
                        comment
                    }
                }
            },
            { new: true } // Restituisce l'esame aggiornato
        );

        if (!updatedExam) {
            return res.status(404).json({ message: "Esame non trovato" });
        }

        res.status(200).json({ message: "Recensione inserita con successo", exam: updatedExam });
    } catch (error) {
        res.status(500).json({ message: "Errore durante l'inserimento della recensione", error });
    }
};

// SOLO PER ADMIN
exports.insertExam = async (req, res) => {
    try {
        // Aggiunto "name"
        const { name, description, professor, degreeCourse } = req.body; 
        
        const newExam = new Exam({
            name, // Aggiunto "name"
            description,
            professor,
            degreeCourse, 
            reviews: [] 
        });

        await newExam.save();
        res.status(201).json({ message: "Esame inserito con successo", exam: newExam });
    } catch (error) {
        res.status(500).json({ message: "Errore durante l'inserimento", error });
    }
};