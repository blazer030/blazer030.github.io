<template>
  <nav aria-label="..." class="sb-admin-2">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pageInfo.has_pre }">
        <a
          class="page-link"
          href="javascript:void(0)"
          @click.prevent="$emit('page-change', pageInfo.current_page - 1)"
          >&laquo;</a
        >
      </li>
      <li
        class="page-item"
        :class="{ active: page === pageInfo.current_page }"
        v-for="page in pages"
        :key="page"
      >
        <a
          class="page-link"
          href="javascript:void(0)"
          @click.prevent="$emit('page-change', page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !pageInfo.has_next }">
        <a
          class="page-link"
          href="javascript:void(0)"
          @click.prevent="$emit('page-change', pageInfo.current_page + 1)"
          >&raquo;</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pageInfo'],
  data() {
    return {
      pages: [],
    };
  },
  mounted() {
    this.pages = [...Array(this.pageInfo.total_pages).keys()].map((n) => n + 1);
  },
  watch: {
    'pageInfo.total_pages': function () {
      this.pages = [...Array(this.pageInfo.total_pages).keys()].map((n) => n + 1);
    },
  },
};
</script>
