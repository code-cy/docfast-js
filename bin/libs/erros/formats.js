module.exports = (data)=>{
    if(!data.format) throw new Error('SOURCE_NOT_HAVE_DOCFATS_FORMAT format: undefined')
    return data;
}