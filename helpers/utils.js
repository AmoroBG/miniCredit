// utils functions

const isEmail = (email) => {
    const regex = /.+@.+\..+/
    // eslint-disable-next-line no-mixed-operators
    return (isEmail) => (isEmail && regex.test(isEmail)) || 'Must be a valid email'
}