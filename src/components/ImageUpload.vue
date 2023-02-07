<template>
  <div class="w-100 px-3">
    <img
      v-if="!image"
      src="../assets/logo.svg"
      contain
      width="250px"
      height="200px"
    />
    <v-img v-if="image" :src="url" width="250px" height="200px" />
    <div id="app" class="mt-1">
      <div v-if="!image" class="d-flex">
        <div
          :class="['dropZone', dragging ? 'dropZone-over' : '']"
          @dragenter="dragging = true"
          @dragleave="dragging = false"
        >
          <div class="dropZone-info" @drag="onChange">
            <span class="fa fa-cloud-upload dropZone-title"></span>
            <v-icon class="mr-2">mdi-camera</v-icon>
            <span class="dropZone-title">{{ $t(`dragFile`) }}</span>
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            @change="onChange"
          />
        </div>
      </div>
      <div v-else class="dropZone-uploaded">
        <div class="dropZone-uploaded-info">
          <button
            type="button"
            class="btn btn-primary removeFile"
            @click="removeFile"
          >
            {{ $t(`removeFile`) }}
            <v-icon class="ml-2">mdi-close-circle-outline</v-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: null,
      dragging: false,
    };
  },
  computed: {
    url() {
      if (!this.image) return;
      return URL.createObjectURL(this.image);
    },
  },
  methods: {
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.dragging = false;
        return;
      }
      this.createFile(files[0]);
    },
    createFile(image) {
      if (image.size > 5000000) {
        alert("please check image size no over 5 MB.");
        this.dragging = false;
        return;
      }
      if (image.length !== 0) {
        this.image = image;
        this.dragging = false;
      }
    },
    removeFile() {
      this.image = null;
    },
  },
  watch: {
    image(value) {
      this.$emit("imageUpload", value);
    },
  },
};
</script>
<style scoped>
.w-100 {
  width: 100% !important;
}
.dropZone {
  width: 100%;
  height: 60px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 60px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 130px;
}
</style>
