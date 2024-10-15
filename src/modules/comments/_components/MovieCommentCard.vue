<template>
  <v-card class="mx-auto">
    <v-toolbar color="cyan-lighten-1">
      <v-toolbar-title>
        {{ items.length > 0 ? title : $t('movie.comment.list.title.no-comment') }}
        <a-tag color="white">{{ items.length }}</a-tag>
      </v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <slot></slot>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import ATag from '@/modules/others/ATag.vue';
import type CommentModel from '@/stores/comments/models/CommentModel';

interface Props {
  items: CommentModel[];
  title: string;
}

const props = defineProps<Props>();
</script>
