<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb
        image="https://tse1-mm.cn.bing.net/th/id/OIP-C.qdj0L3CX5InDPkhA4QgRKwHaFj?w=227&h=180&c=7&r=0&o=5&pid=1.7"
        height="60px"
        width="60px"
        :hoverable="false"
      >
        {{ $t('msg.profile.name') }}
      </pan-thumb>
      <div class="header-desc">
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
    </div>
    <div class="info">
      {{ $t('msg.profile.Introduction') }}

      <div class="imgs-box">
        <section>
          <div class="img-container">
            <img src="@/assets/picture1.jpeg" alt="风景" />
          </div>
          <div class="img-container">
            <img src="@/assets/picture2.jpeg" alt="风景" />
          </div>
          <div class="img-container">
            <img src="@/assets/picture3.jpeg" alt="风景" />
          </div>
          <div class="img-container">
            <img src="@/assets/picture4.jpeg" alt="风景" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 28px;
    font-size: 20px;
    text-indent: 26px;

    .imgs-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 10px 0;
      margin-bottom: 239px;
      perspective: 900px;

      section {
        margin-top: 20px;
        position: relative;
        width: 300px;
        height: 200px;
        cursor: pointer;
        transform-style: preserve-3d;
        animation: rotate 20s linear infinite;

        &:hover {
          animation-play-state: paused;
        }

        .img-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent
                10%, rgba(255, 255, 255, 0.3));

          img {
            width: 300px;
            height: 200px;
          }
        }
      }

      section .img-container {
        &:nth-child(1) {
          transform: translateZ(300px);
        }

        &:nth-child(2) {
          transform: rotateY(90deg) translateZ(300px);
        }

        &:nth-child(3) {
          transform: rotateY(180deg) translateZ(300px);
        }

        &:nth-child(4) {
          transform: rotateY(270deg) translateZ(300px);
        }
      }

      @keyframes rotate {
        0% {
          transform: rotateY(0);
        }

        100% {
          transform: rotateY(360deg);
        }
      }
    }
  }
}
</style>
