<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { Label } from "radix-vue";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { LucideDownload } from "lucide-vue-next";

const numberOfTables = ref(0);
const discount = ref(0);
const maximumTimePerTable = ref(0);

function onStart() {
  alert("Start event");
}

function onEnd() {
  alert("End event");
}

function onSave() {
  alert("Save Changes");
}
</script>

<template>
  <DefaultLayout class="flex flex-col">
    <div class="grow">
      <div class="h-full max-w-screen-sm mx-auto flex flex-col gap-2 p-4">
        <div class="space-y-4">
          <div>
            <Label>
              Anzahl der Tische
            </Label>
            <Input v-model.number="numberOfTables" />
          </div>
          <div>
            <Label>
              Rabatt
            </Label>
            <Input v-model.number="discount" />
          </div>
          <div>
            <Label>
              Maximale Zeit pro Tisch (in Minuten)
            </Label>
            <Input v-model.number="maximumTimePerTable" />
          </div>
        </div>
        <div class="grow" />
        <div class="flex gap-4">
          <Button @click="onStart">
            Start
          </Button>
          <div class="grow" />
          <Button @click="onEnd">
            Beenden
          </Button>
        </div>
      </div>
    </div>
    <div class="flex gap-4 p-4">
      <Button variant="ghost" size="icon">
        <LucideDownload class="size-8" />
      </Button>
      <div class="grow" />
      <Button @click="onSave">
        Speichern
      </Button>
    </div>
  </DefaultLayout>
</template>
