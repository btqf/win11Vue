<template>
  <div class="wrap" @click="toggleLogin">
    <div class="login-wrap">
      <div class="user-wrap">
        <div class="avatar-wrap">
          <img src="@/assets/img/login/avatar.jpg" />
        </div>
        <div class="username">btqf</div>
      </div>
      <input type="password" class="password-ipt" @keyup="keyEvent"/>
       <img src="@/assets/img/login/rightrow.png" class='rightrow' @click="goToHome"/>
    </div>
  </div>
</template>

<script>

export default {
    
    methods: {
        toggleLogin(e) {
            e.target.classList.add('blur-wrap');
        },
        keyEvent(e) {
          if(e.keyCode == 13) this.$router.push('/home');
        },
         goToHome() {
            this.$router.push('/home')
         }
    }
}
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.6s ease-in-out;
    background: url('@/assets/img/login/lock.jpg');
    background-attachment: fixed;
    background-size: 100% 100%;
    // transform: scale(1.1);
    // animation: reverse slideOut 0.1s;

    .login-wrap {
      position: absolute;
      z-index: 9;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: slideIn 1s;
      .user-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .username {
          color: white;
          font-size: 1.8em;
          margin: 0.8em;
        }
        .avatar-wrap {
          img {
            width: 10em;
            height: 10em;
            border-radius: 5em;
          }
        }
      }
      .password-ipt{
          position: absolute;
          z-index: -1;
          top: 17.6em;
          height: 1.8em;
          width: 15em
      }
      .rightrow{
        left: 20em;
        margin-left: 11em;
        width: 1.6em;
        height: 1.6em
      }


      .login-btn {
        margin: 0.5em;
        padding: 0.2em 1em;
        border: 2px solid transparent;
        border-radius: 5px;
        background-color: rgba(237, 234, 234, 0.3);
        &:hover {
          border-color: #8e99f1;
        }
      }
    }
  }

  .wrap::before {
    content: '';
    width: 100%;
    height: 100%;
  }
  .blur-wrap::before {
    filter: blur(25px);
    backdrop-filter: blur(25px);
  }

  @keyframes slideOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(4em);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .error {
    color: red;
  }
</style>
