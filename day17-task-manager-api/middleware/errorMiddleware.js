const errorHandler = (err, req, res, next) => {
    console.error('ERROR OCCURRED:', err); 
  
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({ msg: 'Validation Error', errors });
    }
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }
  
    res.status(err.statusCode || 500).json({
      msg: err.message || 'Something went wrong on the server.',
    });
  };
  
module.exports = errorHandler;