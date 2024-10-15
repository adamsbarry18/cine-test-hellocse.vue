<template>
  <div class="infinite-scroll-button">
    <a-button v-if="hasMore" @click="loadMore" :loading="loading">
      {{ loading ? t('common.loading') : t('common.load-more') }}
    </a-button>
    <h3 v-else class="no-more-items">{{ t('common.no-more-item') }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';
import AButton from '@/modules/basic/AButton.vue';

const { t } = useI18n();

interface Props {
  hasMore: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: 'load-more'): void;
}>();

const loadMore = () => {
  emit('load-more');
};
</script>

<style lang="scss" scoped>
.infinite-scroll-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

  .no-more-items {
    padding: 12px;
    color: var(--color-white);
    border: 1px solid var(--color-grey-300);
    border-radius: 8px;
  }
}
</style>
