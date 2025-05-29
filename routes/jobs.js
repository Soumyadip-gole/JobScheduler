const {getalljob,
    getjob,
    createjob,
    updatejob,
    deletejob
}=require('../controllers/jobs')

const router = require('express').Router()

router.get('/',getalljob)
router.get('/:id',getjob)
router.post('/',createjob)
router.patch('/:id',updatejob)
router.delete('/:id',deletejob)

module.exports = router