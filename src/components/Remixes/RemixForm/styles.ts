const styles = {
  container: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    form: {
      width: '1200px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },

    div: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      margin: '10px',

      input: {
        height: '25px'
      },
      select: {
        height: '25px'
      },
      textarea: {
        resize: 'none'
      },
      span: {
        color: 'red'
      }
    }
  }
};

export default styles;
