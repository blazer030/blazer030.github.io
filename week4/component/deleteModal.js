export default {
    props: ['productInfo'],
    template: `
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">刪除確認</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">您確定要刪除 {{productInfo.title}} 嗎？</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="$emit('confirm', productInfo.id)">確認</button>
                </div>
            </div>
        </div>
    </div>
    `
}