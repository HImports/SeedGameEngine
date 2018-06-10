import Manager from './Manager';
import DOMManager from './DOMManager';
import ProgramManager from './ProgramManager';
import SceneManager from './SceneManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';
import Matrix3 from '../render/WebGL/Matrix3';

export class _RenderManager extends Manager {
    constructor() {
        super();
        this.GL = null;
        this.currentProgram = null;
    }

    start() {
        this.GL = DOMManager.GL;

        console.info(ProgramManager.getProgram('Default'))
        this._updateProgram(ProgramManager.getProgram('Default'));
        
        // look up where the vertex data needs to go.
        this.positionAttributeLocation = this.GL.getAttribLocation(this.currentProgram.program, "a_position");
        this.colorLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_color");
        this.matrixLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_matrix");



        // Create a buffer and put three 2d clip space points in it
        let positionBuffer = this.GL.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, positionBuffer);

        this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), this.GL.STATIC_DRAW);

        this.vao = this.GL.createVertexArray();

        // and make it the one we're currently working with
        this.GL.bindVertexArray(this.vao);

        // Turn on the attribute
        this.GL.enableVertexAttribArray(this.positionAttributeLocation);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size = 2;          // 2 components per iteration
        let type = this.GL.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        let vertexOffset = 0;        // start at the beginning of the buffer
        this.GL.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, vertexOffset);

        // // Create a buffer and put three 2d clip space points in it
        // let positionBuffer = this.GL.createBuffer();

        // // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        // this.GL.bindBuffer(this.GL.ARRAY_BUFFER, positionBuffer);

        // let positions = [
        //     //t1
        //     0, 0,
        //     0, 100,
        //     100, 0,
        //     //t2
        //     100, 0,
        //     100, 100,
        //     0, 100,
        // ];

        // this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(positions), this.GL.STATIC_DRAW);

        // // Create a vertex array object (attribute state)
        // var vao = this.GL.createVertexArray();

        // // and make it the one we're currently working with
        // this.GL.bindVertexArray(vao);

        // // Turn on the attribute
        // this.GL.enableVertexAttribArray(this.positionAttributeLocation);

        // // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        // let size = 2;          // 2 components per iteration
        // let type = this.GL.FLOAT;   // the data is 32bit floats
        // let normalize = false; // don't normalize the data
        // let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        // let vertexOffset = 0;        // start at the beginning of the buffer
        // this.GL.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, vertexOffset);

        // // Tell WebGL how to convert from clip space to pixels
        // this.GL.viewport(0, 0, this.GL.canvas.width, this.GL.canvas.height);

        // // Clear the canvas
        // this.GL.clearColor(0, 0, 1, 1);
        // this.GL.clear(this.GL.COLOR_BUFFER_BIT);

        // // Tell it to use our program (pair of shaders)
        // this.GL.useProgram(this.program);

        // this.GL.uniform2f(this.resolutionUniformLocation, this.GL.canvas.width, this.GL.canvas.height);
        // this.GL.uniform4fv(this.colorLocation, [1,0,0, 1]);
        // this.GL.uniformMatrix3fv(this.matrixLocation, false, [1,0,0,0,1,0,0,0,1]);

        // // draw
        // let primitiveType = this.GL.TRIANGLES;
        // let count = 6;
        // this.GL.drawArrays(primitiveType, 0, count);
    }

    _updateProgram(program) {
        if (this.currentProgram == null || this.currentProgram.id != program.id) {
            console.info('switch')
            this.GL.useProgram(program.program);
            this.currentProgram = program;
        }
    }

    update() {
        

        this.GL.clearColor(0, 0, 0, 0);
    
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);

        let viewports = SceneManager.getCurrentScene().viewports;

        for (let vi = 0; vi < viewports.length; vi++) {
            let viewport = viewports[vi];

            let viewPortWidth = viewport.bounds.p2.x - viewport.bounds.p1.x;
            let viewPortHeight = viewport.bounds.p2.y - viewport.bounds.p1.y;

            this.GL.viewport(viewport.bounds.p1.x, viewport.bounds.p1.y, viewport.bounds.p2.x, viewport.bounds.p2.y);

            //setup camera from viewport

            let renderables = viewport.renderables;
            let renderableKeys = Object.keys(renderables);
            for (let ri = 0; ri < renderableKeys.length; ri++) {
                let renderable = renderables[renderableKeys[ri]];

                this._updateProgram(renderable.program);

                this.GL.uniform4fv(this.colorLocation, renderable.color.color);
                this.GL.uniformMatrix3fv(this.matrixLocation, false, Matrix3.projection(viewPortWidth, viewPortHeight).multiply(renderable.getMatrix()).m);


                this.GL.drawArrays(renderable.primitiveType, 0, renderable.primitiveCount);




                // gl.useProgram(renderable.program);

                // let vao = gl.createVertexArray();
                // gl.createVertexArray(vao);

                // let positionAttributeLocation = this.GL.getAttribLocation(program, "a_position");
                // let matrixLocation = gl.getUniformLocation(program, "u_matrix");
                // var colorLocation = gl.getUniformLocation(program, "u_color");

                // gl.uniform4fv(colorLocation, color);
                
                // gl.uniformMatrix3fv(renderable.matrix, false, matrix);

                // gl.drawArrays(primitiveType, offset, count);

                // var primitiveType = gl.TRIANGLES;
                // gl.drawArrays(renderable.primitiveType, 0, renderable.primitiveCount);
            }
        }
    
        // Set the color.
    
        // Draw the geometry.
    }

    end() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].end();
        // }
    }

    pause() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].pause();
        // }
    }

    unpause() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].unpause();
        // }
    }
}
const RenderManager = new _RenderManager();
export default RenderManager;