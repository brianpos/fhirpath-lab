<template>
  <div>
    <v-alert v-if="parseErrorMessage" variant="outlined" border="start" type="error">
      {{ parseErrorMessage }}
    </v-alert>
    <v-treeview 
      :items="astInverted ? astInvertedTree : astTree" 
      :opened="astInverted ? astOpenInverted : astOpen"
      activatable 
      density="compact"
      item-value="id" 
      item-title="Name"
      item-children="Arguments"
      open-on-click
      class="ast-treeview"
    >
      <template v-slot:prepend="{ item }">
        <v-btn 
          v-if="item.Position != undefined || item.Line != undefined" 
          size="x-small" 
          variant="text"
          icon 
          title="Goto node in expression" 
          @click.stop="navigateToExpressionNode(item)"
        >
          <v-icon>mdi-target</v-icon>
        </v-btn>
        <v-icon v-if="item.ReturnType && item.ReturnType.length == 0" color="red">
          mdi-alert-octagon
        </v-icon>
      </template>
      
      <template v-slot:title="{ item }">
        <template v-if="item.ExpressionType === 'FunctionCallExpression'">
          .<template v-if="item.SpecUrl">
            <a @click.stop target="_blank" :title="nodeTooltip(item)" :href="item.SpecUrl">{{ item.Name }}</a>
          </template>
          <template v-else>{{ item.Name }}</template>(<template v-if="item.Arguments && item.Arguments.length > 0">...</template>)
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        
        <template v-else-if="item.ExpressionType === 'ConstantExpression'">
          <span style="color: #a31515">'{{ item.Name }}'</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        
        <template v-else-if="item.ExpressionType === 'ChildExpression'">
          .<span style="color: #318495; font-weight: bold">{{ item.Name }}</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        
        <template v-else-if="item.ExpressionType === 'VariableRefExpression'">
          <span style="color: #b255a5; font-weight: bold">%{{ item.Name }}</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        
        <template v-else-if="item.ExpressionType === 'AxisExpression' && item.Name === 'builtin.this'">
          <span style="color: #0000ff; font-weight: bold">$this</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        
        <template v-else-if="item.ExpressionType === 'AxisExpression' && item.Name === 'builtin.that'">
          <span style="color: #0000ff">Expression Scope</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        
        <template v-else>
          {{ item.Name }}
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
          ({{ item.ExpressionType }})
        </template>
        
        <template v-if="(!item.ReturnType || item.ReturnType.length == 0) && warnMissingTypeCalc">
          <i><b>(no return type calculated)</b></i>
        </template>
      </template>
      
      <template v-if="showAdvancedSettings && showPositionInformation" v-slot:append="{ item }">
        <v-btn 
          v-if="item.Position != undefined" 
          @click.stop 
          size="x-small" 
          variant="text"
          title="Goto node in expression" 
          @click="navigateToExpressionNode(item)"
        >
          ({{ item.Position }} {{ item.Length }})
        </v-btn>
        <v-btn 
          v-if="item.Line != undefined" 
          @click.stop 
          size="x-small" 
          variant="text"
          title="Goto node in expression" 
          @click="navigateToExpressionNode(item)"
        >
          (l{{ item.Line }}, c{{ item.Column }})
        </v-btn>
      </template>
    </v-treeview>
    
    <v-checkbox v-model="astInverted" label="Inverted Tree"></v-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { JsonNode, fpjsNode } from '@legacy/models/FhirpathTesterData'
import { mapFunctionReferences } from '@legacy/helpers/fhirpath_references'

// Props
const props = defineProps<{
  showAdvancedSettings?: boolean
  astData?: JsonNode | null
}>()

// Emits
const emit = defineEmits<{
  navigateToExpressionNode: [node: JsonNode]
}>()

// State
const astTree = ref<JsonNode[]>([])
const astInvertedTree = ref<JsonNode[]>([])
const astOpen = ref<string[]>([])
const astOpenInverted = ref<string[]>([])
const expression = ref<string>('')
const astInverted = ref<boolean>(false)
const warnMissingTypeCalc = ref<boolean>(false)
const parseErrorMessage = ref<string | undefined>('')

// Computed
const showPositionInformation = computed(() => {
  const tree = astInverted.value ? astInvertedTree.value : astTree.value
  if (!tree || tree.length <= 0) return false
  if (tree[0].Position == undefined && tree[0].Line == undefined) return false
  return true
})

// Methods
const navigateToExpressionNode = (node: JsonNode) => {
  emit('navigateToExpressionNode', node)
}

const nodeTooltip = (node: JsonNode): string | undefined => {
  if (mapFunctionReferences.has(node.Name)) {
    const ref = mapFunctionReferences.get(node.Name)
    if (ref) {
      let title = ref.title
      if (ref.description) {
        title += '\n' + ref.description
      }
      if (ref.specUrl) {
        title += '\n' + ref.specUrl
      }
      return title
    }
  }
  if (node.SpecUrl) {
    return node.SpecUrl
  }
  return undefined
}

const clearDisplay = (message?: string) => {
  astTree.value = []
  astInvertedTree.value = []
  astOpen.value = []
  astOpenInverted.value = []
  parseErrorMessage.value = message
}

const hasAnyTypeInfo = (node: JsonNode): boolean => {
  if (node.ReturnType && node.ReturnType.length > 0 && node.ExpressionType != 'ConstantExpression') {
    return true
  }
  if (node.Arguments && node.Arguments.length > 0) {
    return node.Arguments.some(arg => hasAnyTypeInfo(arg))
  }
  return false
}

const displayTree = (node: JsonNode) => {
  parseErrorMessage.value = undefined

  astTree.value = [node]
  const lastId = allocateNodeCollectionIds(astTree.value)
  astOpen.value = Array.from({ length: lastId }, (_, i) => i.toString())

  astInvertedTree.value = invertTree(astTree.value[0])
  const lastIdInverted = allocateNodeCollectionIds(astInvertedTree.value)
  astOpenInverted.value = Array.from({ length: lastIdInverted }, (_, i) => i.toString())
  
  // Only warn about missing type info if ANY node has type information
  warnMissingTypeCalc.value = hasAnyTypeInfo(node)
}

// Helper functions (imported from legacy component logic)
const allocateNodeIds = (ast: JsonNode, startAt: number = 0): number => {
  if (ast.ExpressionType === 'FunctionCallExpression') {
    if (mapFunctionReferences.has(ast.Name)) {
      const ref = mapFunctionReferences.get(ast.Name)
      if (ref) {
        ast.SpecUrl = ref.specUrl
      }
    }
  }
  ast.id = startAt.toString()
  startAt++
  if (ast.Arguments && ast.Arguments.length > 0) {
    return allocateNodeCollectionIds(ast.Arguments, startAt)
  }
  return startAt
}

const allocateNodeCollectionIds = (ast: JsonNode[], startAt: number = 0): number => {
  ast.forEach((element) => {
    startAt = allocateNodeIds(element, startAt)
  })
  return startAt
}

const invertTree = (ast: JsonNode): JsonNode[] => {
  const rootItem: JsonNode = {
    ExpressionType: ast.ExpressionType,
    Name: ast.Name,
    Arguments: [],
    ReturnType: ast.ReturnType,
  }
  if (ast.Position != undefined) rootItem.Position = ast.Position
  if (ast.Line != undefined) rootItem.Line = ast.Line
  if (ast.Column != undefined) rootItem.Column = ast.Column
  if (ast.Length != undefined) rootItem.Length = ast.Length

  const result: JsonNode[] = []
  if (ast.Arguments && ast.Arguments.length > 0) {
    const focus = invertTree(ast.Arguments[0])
    result.push(...focus)
    if (ast.Arguments?.length > 1) {
      ast.Arguments.forEach((element, index) => {
        if (index > 0) {
          const elementArgs = invertTree(element)
          rootItem.Arguments?.push(...elementArgs)
        }
      })
    } else {
      delete rootItem.Arguments
    }
  }
  result.push(rootItem)
  return result
}

// Watch for astData prop changes
watch(() => props.astData, (newValue) => {
  if (newValue) {
    displayTree(newValue)
  } else {
    clearDisplay()
  }
}, { immediate: true })
</script>

<style scoped>
a {
  color: rgba(0, 0, 0, .87);
}

a:hover {
  color: #1976d2;
}

/* Make the tree more compact and add borders like Vuetify 2 */
.ast-treeview :deep(.v-treeview-item) {
  border-top: thin solid rgba(0, 0, 0, 0.12);
  min-height: auto;
}

.ast-treeview :deep(.v-list-item) {
  padding-top: 0px;
  padding-bottom: 0px;
}

.ast-treeview :deep(.v-list-item.title) {
    font-size: 14px;
}
</style>
