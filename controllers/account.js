const Account = new require('../model/account')

exports.show = async (req, res) => {
    const user = await Account.findByPk(req.params.id)

    if (!user) {
        return res.status(400).send({ message: 'User not found' })
    }
    return res.status(200).send({
        username: user.username,
        email: user.email,
        avatar: user.avatar
    })

}

exports.store = async (req, res) => {
    const {username, avatar, email, password, confirm_password} = req.body

    if (password !== confirm_password) {
        return res.status(400).send({ message: 'Passwords are not matching' })
    }

    await Account.create({
        username,
        email,
        avatar,
        password
    }).then((obj) => {
        return res.status(200).send({ message: 'User registered successfully' })
    }).catch((onerror) => {
        return res.status(400).send({ message: onerror.errors[0].message })
    });
}
exports.update = async (req, res) => {
    const user = await Account.findByPk(req.params.id)

    if (!user) {
        return res.status(400).send({ message: 'User not found' })
    }
    if (req.body.password && req.body.password !== req.body.confirm_password) {
        return res.status(400).send({ message: 'Passwords are not matching' })
    }
    user.update(req.body).then((obj) => {
        return res.status(200).send({ message: 'User updated successfully' })
    }).catch((onerror) => {
        return res.status(400).send({ message: onerror.errors[0].message })
    });
}
exports.delete = async (req, res) => {
    const user = await Account.findByPk(req.params.id)

    if (!user) {
        return res.status(400).send({ message: 'User not found' })
    }
    await user.destroy();

    return res.status(200).send({ message: 'User deleted successfully' })
}