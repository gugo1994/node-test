const Account = new require('../model/account')

exports.show = async (req, res) => {
    const user = await Account.findByPk(req.params.id)

    if (!user) {
        return res.status(400).send('User not found')
    }
    return res.status(200).send({
        username: user.username,
        email: user.email
    })

}

exports.store = async (req, res) => {

    const {username, email, password, confirm_password} = req.body

    if (password !== confirm_password) {
        return res.status(400).send('Confirm your password')
    }
    await Account.create({
        username,
        email,
        password
    }).then((obj) => {
        return res.status(200).send({
            username: obj.username,
            email: obj.email
        })
    }).catch((onerror) => {
        return res.status(400).send(onerror.errors[0].message)
    });
}
exports.update = async (req, res) => {
    const user = await Account.findByPk(req.params.id)

    if (!user) {
        return res.status(400).send('User not found')
    }
    if (req.body.password && req.body.password !== req.body.confirm_password) {
        return res.status(400).send('Confirm your password')
    }
    user.update(req.body).then((obj) => {
        return res.status(200).send({
            username: obj.username,
            email: obj.email
        })
    }).catch((onerror) => {
        return res.status(400).send(onerror.errors[0].message)
    });
}
exports.delete = async (req, res) => {
    const user = await Account.findByPk(req.params.id)

    if (!user) {
        return res.status(400).send('User not found')
    }
    await user.destroy();

    return res.status(200).send('User destroyed successfully')
}