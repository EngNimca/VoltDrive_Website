// Error kasta u beddel farriin cad (hal meel)
const handleError = (res, error) => {
    // ID khalad ah (tusaale "ID-GAARI" halkii ID dhab ah)
    if (error.name === 'CastError') {
        return res.status(400).json({ message: `Invalid ID: "${error.value}". A real ID has 24 letters and numbers.` });
    }

    // Xog dhiman ama khalad ah
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e) => {
            if (e.kind === 'required') return `${e.path} is required`;
            if (e.kind === 'ObjectId') return `${e.path} is not a valid ID`;
            return `${e.path}: ${e.message}`; // enum, min, max...
        });
        return res.status(400).json({ message: messages.join(', ') });
    }

    // Magac/email hore ayuu u jiray
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({ message: `${field} already exists` });
    }

    // Wax kale: cilad Backend (eeg terminal-ka)
    res.status(500).json({ message: 'Server error', error: error.message });
};

export default handleError;