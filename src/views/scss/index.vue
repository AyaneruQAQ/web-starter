<template>
  <div class="page">
    <el-card header="基本颜色">
      <div class="category">
        <div class="blue color-item">
          <div class="title">
            蓝色链接
          </div>
          <div class="var">
            $blue
          </div>
        </div>
        <div class="gray color-item">
          <div class="title">
            灰色
          </div>
          <div class="var">
            $gray
          </div>
        </div>
        <div class="textColor color-item">
          <div class="title">
            文本颜色
          </div>
          <div class="var">
            $textColor
          </div>
        </div>
        <div class="activeText color-item">
          <div class="title">
            激活文本
          </div>
          <div class="var">
            $activeText
          </div>
        </div>
        <div class="shadow color-item">
          <div class="title">
            阴影
          </div>
          <div class="var">
            $shadow
          </div>
        </div>

      </div>
    </el-card>

    <el-card header="字体大小">
      <div class="category">
        <div class="h1 color-item">
          <div class="title">
            一级标题
          </div>
          <div class="var">
            $h1
          </div>
        </div>
        <div class="h2 color-item">
          <div class="title">
            二级标题
          </div>
          <div class="var">
            $h2
          </div>
        </div>
        <div class="h3 color-item">
          <div class="title">
            三级标题
          </div>
          <div class="var">
            $h3
          </div>
        </div>
        <div class="h4 color-item">
          <div class="title">
            四级标题
          </div>
          <div class="var">
            $h4
          </div>
        </div>
        <div class="h5 color-item">
          <div class="title">
            五级标题
          </div>
          <div class="var">
            $h5
          </div>
        </div>

        <div class="size color-item">
          <div class="title">
            正文字体
          </div>
          <div class="var">
            $size
          </div>
        </div>
      </div>
    </el-card>

  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import "@/styles/common.scss";
.el-card {
  margin: 20px auto;
  width: 80%;
}
.category {
  margin: 0 auto;
  width: 95%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .color-item {
    width: 15%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    .title {
      width: 100%;
    }
    .var {
      width: 100%;
    }
  }
}

.blue {
  color: #fff;
  background-color: $blue;
}
.gray {
  color: $blue;
  background-color: $gray;
}
.textColor {
  color: $textColor;
}
.activeText {
  color: $activeText;
}
.shadow {
  box-shadow: $shadow;
}
.size {
  font-size: $size;
  background-color: $gray;
}
.h1 {
  font-size: $h1;
  background-color: $gray;
}
.h2 {
  font-size: $h2;
  background-color: $gray;
}
.h3 {
  font-size: $h3;
  background-color: $gray;
}
.h4 {
  font-size: $h4;
  background-color: $gray;
}
.h5 {
  font-size: $h5;
  background-color: $gray;
}
</style>
